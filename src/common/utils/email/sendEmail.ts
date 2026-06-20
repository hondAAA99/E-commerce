import mailEnum from '../../enum/mail.enum';
import { eventEmitter } from './email.event';
import { sendMail } from './nodeMailer';
import redisServices from '../../services/redis.services';
import { globalHash } from '../../utils/security/hash';
import cacheKeyEnum from '../../enum/redis.base.enum';
import { HttpException } from '@nestjs/common';

export const sendEmail = async ({
  to,
  subject,
  data,
}: {
  to: string;
  subject: string;
  data: any;
}) => {
  const redis = new redisServices(null as any);

  const blockedUserTtl = await redis.getKeyTtl(
    redis.cacheKey({
      filter: to,
      subject: cacheKeyEnum.block,
    })
  );

  const attemptsValue = await redis.getKey({
    key: redis.cacheKey({
      filter: to,
      subject: cacheKeyEnum.emailAttempts,
    }),
  });

  if (blockedUserTtl && blockedUserTtl > 0) {
    throw new HttpException(
      `you are being blocked please wait for ${blockedUserTtl}`,
      400
    );
  }

  let attempts = attemptsValue ? parseInt(attemptsValue) : 0;

  if (!attemptsValue) {
    await redis.setKey({
      key: redis.cacheKey({
        filter: to,
        subject: cacheKeyEnum.emailAttempts,
      }),
      value: '0',
      ttl: 60 * 10,
    });
  }

  // incr attempts email
  await redis.incrKey(
    redis.cacheKey({
      filter: to,
      subject: cacheKeyEnum.emailAttempts,
    })
  );

  attempts++;

  if (attempts > 5) {
    await redis.setKey({
      key: redis.cacheKey({
        filter: to,
        subject: cacheKeyEnum.block,
      }),
      value: '1',
      ttl: 60 * 10,
    });
    throw new HttpException('you are being blocked for 10min', 401);
  }

  eventEmitter.emit(mailEnum.sendMail, async () => {
    await Promise.all([
      redis.setKey({
        key: redis.cacheKey({ filter: to, subject }),
        value: globalHash(`${data}`),
        ttl: 60 * 5,
      }),
      sendMail({
        to,
        subject,
        data,
      }),
    ]);
  });
};

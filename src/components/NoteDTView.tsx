import { memo } from 'react';
import moment from 'moment-timezone';

type Props = { dt: number | undefined };

const NoteDTView = memo(function NoteDTView({ dt }: Props) {
  const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  moment.tz.setDefault(timezone);
  return dt && moment.unix(dt).format('DD.MM.YYYY HH:mm:ss');
});

export { NoteDTView };

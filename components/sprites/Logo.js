import Link from 'next/link';

export default ({ href, dim }) => (
  <Link href={href || '/'}>
    <a className={`brand ${dim || ''}`}>
      <span className="brand-logo fi flaticon-big-megaphone"></span>
      <span className="brand-title">Speech</span>
    </a>
  </Link>
);

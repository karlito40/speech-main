import Link from 'next/link';

export default ({ href, dim, className }) => (
  <Link href={href || '/'}>
    <a className={`brand ${className || ''} ${dim || ''}`}>
      <span className="brand-logo fi flaticon-big-megaphone"></span>
      <span className="brand-title">Speech</span>
    </a>
  </Link>
);

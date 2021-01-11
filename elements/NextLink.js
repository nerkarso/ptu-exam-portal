import Link from 'next/link';
import { useRouter } from 'next/router';
import { Children, cloneElement } from 'react';

export default function NextLink({ children, activeClassName, ...props }) {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';
  const className =
    asPath === props.href || asPath === props.as ? `${childClassName} ${activeClassName}`.trim() : childClassName;

  return (
    <Link {...props}>
      {cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}

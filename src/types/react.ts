/* eslint-disable @typescript-eslint/no-namespace */
export declare namespace Component {
  type Children = {
    /** Component children. */
    children: React.ReactNode;
  };

  type ClassName = {
    /** Component class name [optional]. */
    className?: string;
  };

  type Style = {
    /** Component style [optional]. */
    style?: React.CSSProperties;
  };

  type AnyProps = {
    /** Component props. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

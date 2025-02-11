import { Component as ReactComponent } from '@/types/react';

// prettier-ignore
type ComponentProps = Partial<(
  ReactComponent.ClassName &
  ReactComponent.Style &
  ReactComponent.Children &
  ReactComponent.AnyProps
)>;

/**
 * This component is used during development to export it as a named export
 * via a component file. It is mainly used for testing purposes. Example:
 * ```tsx
 * // file: components/my-component.tsx
 * export { Component as MyComponent } from '@/components/_component';
 * ```
 */
export const Component = ({ className, style, children, ...props }: ComponentProps) => {
  className = className ? `${Component.name} ${className}` : Component.name;

  return (
    <div style={style} className={className} {...props}>
      {children}
    </div>
  );
};

export { Component as default };

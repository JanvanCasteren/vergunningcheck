import React, { Children } from "react";

type Callback = (index?: number) => any;

/**
 * This utilily is copy-pasted from `asc-ui` because it isn't exported.
 * We can remove it if we don't need it anymore.
 *
 * Use in case we need to pass props to children.
 * @param propsOrCallback this could be an object or a callback with the index as a parameter
 * @param childrenProps React children
 */
const usePassPropsToChildren = (
  childrenProps: React.ReactNode | boolean,
  propsOrCallback: React.PropsWithoutRef<{}> | Callback
) => {
  const children = Children.map(childrenProps, (child, index) => {
    if (child) {
      return React.cloneElement(
        child as React.ReactElement<any>,
        typeof propsOrCallback === "function"
          ? propsOrCallback(index)
          : propsOrCallback
      );
    }
  });

  return { children };
};

export default usePassPropsToChildren;

import { createContext, useContext, useEffect, useRef, useState, ElementType, ReactNode, Fragment } from 'react';

interface TransitionContextType {
  parent: {
    show: boolean;
    appear: boolean;
    isInitialRender: boolean;
  };
}

const TransitionContext = createContext<TransitionContextType>({
  parent: {
    show: true,
    appear: false,
    isInitialRender: false,
  },
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

interface TransitionProps {
  as?: ElementType;
  show?: boolean;
  appear?: boolean;
  unmount?: boolean;
  children: ReactNode;
  [key: string]: any;
}

function filterProps(props: Record<string, any>, Component: ElementType) {
  if (Component === Fragment) {
    // Only allow 'key' and 'children' for Fragment
    const { key, children, ...rest } = props;
    const filtered: Record<string, any> = {};
    if (key !== undefined) filtered.key = key;
    return filtered;
  }
  
  // Filter out Replit-specific metadata props
  const { 'data-replit-metadata': _, ...filtered } = props;
  return filtered;
}

export function Transition({
  as = 'div',
  show = true,
  appear = false,
  unmount = true,
  children,
  ...props
}: TransitionProps) {
  const Component = as === 'div' ? 'div' : as;
  const isInitialRender = useIsInitialRender();
  const [state, setState] = useState(show ? 'enter' : 'exit');

  useEffect(() => {
    if (isInitialRender) return;
    setState(show ? 'enter' : 'exit');
  }, [show, isInitialRender]);

  if (unmount && state === 'exit') return null;

  const filteredProps = filterProps(props, Component);

  if (Component === Fragment) {
    return (
      <TransitionContext.Provider
        value={{
          parent: {
            show,
            appear,
            isInitialRender,
          },
        }}
      >
        <Fragment>{children}</Fragment>
      </TransitionContext.Provider>
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          appear,
          isInitialRender,
        },
      }}
    >
      <Component {...filteredProps}>{children}</Component>
    </TransitionContext.Provider>
  );
}

interface TransitionChildProps {
  as?: ElementType;
  children: ReactNode;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  appear?: boolean;
  unmount?: boolean;
  [key: string]: any;
}

Transition.Child = function TransitionChild({
  as = 'div',
  children,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear = false,
  unmount = true,
  ...props
}: TransitionChildProps) {
  const Component = as;
  const { parent } = useContext(TransitionContext);
  const [state, setState] = useState(parent.show ? 'enter' : 'exit');
  const [displayState, setDisplayState] = useState(state);
  const [styles, setStyles] = useState<string>('');

  const initialRef = useRef(false);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialRef.current) return;
    initialRef.current = true;
    
    if (!parent.show) return;
    
    setDisplayState('enter');
    setStyles(`${enter} ${enterFrom}`);
    
    const timer = setTimeout(() => {
      setStyles(`${enter} ${enterTo}`);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [enter, enterFrom, enterTo, parent.show]);

  useEffect(() => {
    if (parent.isInitialRender) return;
    
    if (state === 'enter' && parent.show) {
      setDisplayState('enter');
      setStyles(`${enter} ${enterFrom}`);
      
      const timer = setTimeout(() => {
        setStyles(`${enter} ${enterTo}`);
      }, 10);
      
      return () => clearTimeout(timer);
    }
    
    if (state === 'exit' || !parent.show) {
      setDisplayState('exit');
      setStyles(`${leave} ${leaveFrom}`);
      
      const timer = setTimeout(() => {
        setStyles(`${leave} ${leaveTo}`);
        
        const nextTimer = setTimeout(() => {
          setStyles('');
        }, 300); // Match your transition duration
        
        return () => clearTimeout(nextTimer);
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [state, parent.show, parent.isInitialRender, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo]);

  useEffect(() => {
    if (parent.isInitialRender) return;
    setState(parent.show ? 'enter' : 'exit');
  }, [parent.show, parent.isInitialRender]);

  if (unmount && displayState === 'exit' && !styles.includes(leave)) return null;

  const filteredProps = filterProps(props, Component);

  if (Component === Fragment) {
    return (
      <Fragment>
        {typeof children === 'function' ? children({ state: displayState }) : children}
      </Fragment>
    );
  }

  return (
    <Component 
      ref={transitionRef} 
      className={styles} 
      {...filteredProps}
    >
      {typeof children === 'function' ? children({ state: displayState }) : children}
    </Component>
  );
};

interface DialogProps {
  as?: ElementType;
  open?: boolean;
  onClose: () => void;
  children?: ReactNode;
  [key: string]: any;
}

export function Dialog({
  as = 'div',
  open = true,
  onClose,
  children,
  ...props
}: DialogProps) {
  const Component = as;
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  const filteredProps = filterProps(props, Component);

  if (Component === Fragment) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Component {...filteredProps} onClick={(e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      {children}
    </Component>
  );
}

Dialog.Panel = function DialogPanel({ 
  as = 'div', 
  children, 
  ...props 
}: { 
  as?: ElementType; 
  children: ReactNode; 
  [key: string]: any; 
}) {
  const Component = as;
  const filteredProps = filterProps(props, Component);
  
  if (Component === Fragment) {
    return <Fragment>{children}</Fragment>;
  }
  
  return <Component {...filteredProps}>{children}</Component>;
};
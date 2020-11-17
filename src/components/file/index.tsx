import React, {
  useRef,
  ReactNode,
  useEffect,
  useState,
  forwardRef,
} from 'react';

export interface Selected {
  files: File[];
}

export interface ChildrenProps {
  files: Selected['files'] | null;
  open: () => void;
  reset?: () => void;
  input?: any;
}

export interface ComponentProps {
  multiple?: boolean;
  accept?: string;
  className?: string;
  children?: (props: ChildrenProps) => ReactNode;
  onChange: (files: ChildrenProps['files']) => void;
}

const Component: React.FC<ComponentProps> = forwardRef(
  ({ multiple, accept, className = 'file', children, onChange }, ref: any) => {
    const [selected, updateSelected] = useState<Selected | null>(null);
    const fileRef: any = useRef(null);

    const getSelectedFiles = () => {
      return selected ? selected.files : null;
    };

    const onFileSelect = (e: any) => {
      const files = [...e.target.files];

      updateSelected({
        files: files,
      });
    };

    const openFileSelect = () => {
      if (fileRef.current) {
        fileRef.current.click();
      }
    };

    const resetEvent = () => {
      if (fileRef.current) {
        fileRef.current.value = null;
      }

      updateSelected(null);
    };

    const getMethods = () => ({
      input: fileRef.current,
      open: openFileSelect,
      reset: resetEvent,
    });

    useEffect(() => {
      onChange(getSelectedFiles());
    }, [selected]);

    useEffect(() => {
      if (ref) {
        ref.current = getMethods();
      }
    }, [ref, fileRef]);

    return (
      <div className={className}>
        {children &&
          children({
            ...getMethods(),
            files: getSelectedFiles(),
          })}

        {!children && (
          <>
            <button className="choose" onClick={openFileSelect}>
              Choose file
            </button>

            {selected && (
              <div className="info">
                {Array.from(selected.files).map((file, key) => (
                  <div key={key}>{file.name}</div>
                ))}
              </div>
            )}
          </>
        )}

        <input
          className="element"
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={onFileSelect}
          ref={fileRef}
          hidden
        />
      </div>
    );
  }
);

Component.displayName = 'File';

export default Component;

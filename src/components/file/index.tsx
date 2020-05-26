import React, { useRef, ReactNode, useEffect, useState, forwardRef } from 'react';

export interface ChildrenProps {
    files: FileList | null,
    open: () => void,
    input: any,
}

export interface ComponentProps {
    multiple?: boolean;
    accept?: string;
	className?: string;
    children?: (props: ChildrenProps) => ReactNode;
    onChange: (files: FileList | null) => void;
}

const Component: React.FC<ComponentProps> = forwardRef(({
	multiple,
	accept,
	className='file',
    children,
    onChange,
}, ref: any) => {
    const [selectedFiles, updateSelectedFiles] = useState<FileList | null>(null)
	const fileRef: any = useRef(null);

    const onFileSelect = (e: any) => {
        const files = e.target.files

        updateSelectedFiles(files)
    }

    const openFileSelect = () => {
        if(fileRef.current) {
            fileRef.current.click()
        }
    }

    const resetEvent = () => {
        if(fileRef.current) {
            fileRef.current.value = null
        }

        updateSelectedFiles(null)
    }

    const getMethods = () => ({
        input: fileRef.current,
        open: openFileSelect,
        reset: resetEvent,
    })

    useEffect(() => {
        onChange(selectedFiles)
    }, [selectedFiles])

    useEffect(() => {
        if(ref) {
            ref.current = getMethods()
        }
    }, [ref, fileRef])

	return (
        <div className={className}>
            {children &&
                children({
                    ...getMethods(),
                    files: selectedFiles,
                })
            }

            {!children &&
                <>
                    <button
                        className='choose'
                        onClick={openFileSelect}
                    >
                        Choose file
                    </button>

                    <div className="info">
                        {selectedFiles && Array.from(selectedFiles).map((file, key) => (
                            <div key={key}>
                                {file.name}
                            </div>
                        ))}
                    </div>
                </>
            }

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
});

Component.displayName = 'File'

export default Component;

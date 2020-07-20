import React, { useState, useEffect, useRef, ReactNode } from 'react';

type Data = {
	label: string;
	value?: any;
};

export interface Option {
	data: Data;
	id?: number | string;
	selected?: boolean;
	options?: Option[];
	isDisabled?: boolean;
}

interface NestedOptionsProps {
	options: Option[];
	onChange: (option: Option) => void;
}

export interface Props {
	placeholder?: ReactNode | string;
	className?: string;
	options: NestedOptionsProps['options'];
	onChange: NestedOptionsProps['onChange'];
	openOptions?: boolean;
	customSelected?: (
		selected: Option | undefined,
		placeholder: Props['placeholder']
	) => ReactNode;
	defaultValue?: Option;
}

const isAllChildDisabled = (values: Option[]) => {
	let disabled = true;

	for (const value of values) {
		// when one enabled is found
		if (!value.isDisabled) {
			disabled = false;

			break;
		}

		if (value.options && !isAllChildDisabled(value.options)) {
			disabled = false;

			break;
		}
	}

	return disabled;
};

const NestedOptions: React.FC<NestedOptionsProps> = ({ options, onChange }) => {
	return (
		<>
			{options.map(
				({ data, options: children=[], isDisabled, selected }, key) => (
					<div
						key={key}
						className={`options ${isDisabled ? 'disabled' : ''} ${
							children.length > 0 ? 'has-children' : 'no-children'
						} ${
							children.length > 0 && isAllChildDisabled(children)
								? 'children-disabled'
								: ''
						}`}
					>
						<div
							className={`label ${isDisabled ? 'disabled' : ''} ${
								selected ? 'selected' : ''
							}`}
							onClick={() => {
								if (!isDisabled) {
									onChange(options[key]);
								}
							}}
						>
							<div className="text">{data.label}</div>
						</div>

						{children.length > 0 && (
							<div className="children">
								<NestedOptions
									options={children}
									onChange={onChange}
								/>
							</div>
						)}
					</div>
				)
			)}
		</>
	);
};

const mapOptionsState = (values: Option[], lastId = 0):Option[] => {
	let id = lastId;

	return values.map(value => {
		if (!value.id) {
			id++;
		}

		return {
			...value,
			id: value.id ? value.id : id,
			selected: value.selected ? value.selected : false,
			options: value.options
				? mapOptionsState(value.options, id)
				: undefined,
		};
	});
};

const selectOptionsById = (values: Option[], id: string | number | undefined): Option[] => {
    return values.map(value => {
        return {
            ...value,
            selected: value.id == id ? true : false,
            options: value.options
                ? selectOptionsById(value.options, id)
                : undefined,
        };
    });
};

const Component: React.FC<Props> = ({
	className = 'nested-select',
	customSelected,
	placeholder = 'Choose',
	defaultValue,
	options,
	onChange,
	openOptions = false,
}) => {
	const ControlDOM = useRef<HTMLDivElement>(null);
	const OptionsDOM = useRef<HTMLDivElement>(null);

	const [optionsOpen, updateOptionsOpen] = useState(false);
	const [selected, updateSelected] = useState<Option | undefined>();
	const [Options, updateOptions] = useState<Option[]>([]);

	const onSelected = (option: Option) => {
		updateSelected(option);

		onChange(option);

		updateOptions(old => selectOptionsById(old, option.id));
	};

	const containerClick = (e: any) => {
		if (OptionsDOM.current && ControlDOM.current) {
			if (
				!ControlDOM.current.contains(e.target) &&
				!OptionsDOM.current.contains(e.target)
			) {
				updateOptionsOpen(false);
			}
		}
	};

	useEffect(() => {
		window.addEventListener('click', containerClick);

		return () => {
			window.removeEventListener('click', containerClick);
		};
	}, []);

	useEffect(() => updateOptions(mapOptionsState(options)), [options]);

	useEffect(() => {
		updateOptionsOpen(false);
	}, [selected]);

	useEffect(() => {
		if (defaultValue && !selected) {
			updateOptions(old => selectOptionsById(old, defaultValue.id));

			updateSelected(defaultValue);
		}
	}, [defaultValue]);

	return (
		<div className={className}>
			<div
				ref={ControlDOM}
				className="control"
				onClick={() => updateOptionsOpen(old => !old)}
			>
				{!customSelected && (
					<>
						{selected && (
							<div className="value">{selected.data.label}</div>
						)}

						{!selected && (
							<div className="value">{placeholder}</div>
						)}
					</>
				)}

				{customSelected && customSelected(selected, placeholder)}
			</div>

			{(optionsOpen || openOptions) && (
				<div className="options-menu" ref={OptionsDOM}>
					<NestedOptions options={Options} onChange={onSelected} />
				</div>
			)}
		</div>
	);
};

const ComponentCache = React.memo(Component);

ComponentCache.displayName = 'NestedSelect';

export default ComponentCache;

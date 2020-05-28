import React, { useRef, useEffect } from 'react';

let ThrottleTimer: any = null;

export interface Props {
	distance: number;
	throttle?: number;
	className?: string;
	onLoad: () => void;
	onDestroy?: () => void;
}

/**
 * Get the first scroll parent of an element
 * @param  {DOM} elm        the element which find scroll parent
 * @return {DOM}            the first scroll parent
 */
const getScrollParent = (elm: any): any => {
	const elmStyles = getComputedStyle(elm);

	if (elm.tagName === 'BODY') {
		return window;
	} else if (
		elm.scrollHeight !== elm.offsetHeight
        &&
		['scroll', 'auto'].indexOf(elmStyles.overflowY) == 1
	) {
		return elm;
	}

	return getScrollParent(elm.parentNode);
};

/**
 * Callback aggregator
 * @param  {FUNCTION} fn    Function to process
 * @param  {NUMBER} ms      Delaly before process
 */
const Throttle = (fn: () => void, ms: number) => {
	clearTimeout(ThrottleTimer);

	ThrottleTimer = setTimeout(() => {
		fn();
	}, ms);
};

const Component: React.FC<Props> = ({
	children,
	distance,
	throttle = 100,
    className = 'scroll-more',
	onLoad,
	onDestroy = () => undefined,
}) => {
	const Container: any = useRef();

	useEffect(() => {
		// no server side
		if (window) {
			const Scroller = getScrollParent(Container.current);

			const onScroll = (Ev: any) => {
                    const ScrollerTop = Scroller !== window ? Scroller.getBoundingClientRect().top : Scroller.pageYOffset
                    const ScrollerHeight = Scroller !== window ? Scroller.offsetHeight : Scroller.innerHeight

					const TargetRect = Container.current.getBoundingClientRect();
					const TargetRealTop = TargetRect.top - ScrollerTop;
					const TargetBottom = TargetRealTop + Container.current.offsetHeight;

					const scrollableDistance = TargetBottom - ScrollerHeight;

					if (scrollableDistance <= distance) {
                        Throttle(() => {
    						onLoad();
                        }, throttle);
					}
			};

			Scroller.addEventListener('scroll', onScroll);

			return () => {
				Scroller.removeEventListener('scroll', onScroll);

                onDestroy()
			};
		}
	}, [children, distance]);

	return (
        <div className={className} ref={Container}>
            {children}
        </div>
	);
};

Component.displayName = 'ScrollMore'

export default Component;
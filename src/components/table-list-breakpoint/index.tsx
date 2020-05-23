import React, { useState, useEffect, useCallback } from "react"

export type Thead = {
    [key: string]: string;
}

export interface Props {
    thead?: Thead | ((listView: boolean) => Thead);

    data?: object[] | ((listView: boolean) => object[]);

    caption?: string | ((listView: boolean) => any);
    viewSwitchAt?: number;
    className?: string;
    tableFieldClass?: string;
    listFieldClass?: string;
}

const Component = (props: Props) => {
    const {
        tableFieldClass='t-fields',
        listFieldClass='l-fields',
        className='',
        viewSwitchAt=500,
        thead,
        caption,
        data=[],
    } = props

    const [ listView, setListView ] = useState(false)

    const captionData = typeof caption == 'function' ? caption(listView) : caption;
    const headData = typeof thead == 'function' ? thead(listView) : thead;
    const cellData = typeof data == 'function' ? data(listView) : data

    const switchView = useCallback(() => {
        if(window.innerWidth <= viewSwitchAt) {
            setListView(true)
        }
        else {
            setListView(false)
        }
    }, [viewSwitchAt])

    useEffect(() => {
        window.addEventListener('load', switchView);
        window.addEventListener('resize', switchView)

        return () => {
            window.removeEventListener('load', switchView);
            window.removeEventListener('resize', switchView);
        }
    }, [])

    const theadData = []
    const tdData = cellData.map((row: any) => {
        const format = []

        for (const name in row) {
            format.push({
                name: name,
                value: row[name]
            })
        }

        return format
    })

    if(thead) {
        for (const name in headData) {
            theadData.push({
                name: name,
                value: headData[name],
            })
        }
    }

    return (
        <>
            {!listView &&
                <table
                    className={`table-list-breakpoint table-view ${className}`}
                >
                    {captionData &&
                        <caption>
                            {captionData}
                        </caption>
                    }

                    {headData &&
                        <thead>
                            <tr>
                                {theadData.map((head, key) =>
                                    <th
                                        key={key}
                                        className={`${tableFieldClass} ${head.name}`}
                                    >
                                        {head.value}
                                    </th>
                                )}
                            </tr>
                        </thead>
                    }

                    <tbody>
                        {tdData.map((row, trKey) =>
                            <tr
                                key={trKey}
                            >
                                {row.map((item, tdKey) =>
                                    <td
                                        key={tdKey}
                                        className={`${tableFieldClass} ${item.name}`}
                                    >
                                        {typeof item.value == 'function' ? item.value() : item.value}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            }

            {listView &&
                <div
                    className={`table-list-breakpoint list-view ${className}`}
                >
                    {captionData &&
                        <h2 className="list-title">
                            {captionData}
                        </h2>
                    }

                    <div className="list-contents">
                        {tdData.map((row, rKey) =>
                            <div
                                key={rKey}
                            >
                                {row.map((item, itemKey) =>
                                    <div
                                        key={itemKey}
                                        className={`${listFieldClass} ${item.name}`}
                                    >
                                        {(headData && headData[item.name]) && (
                                            <div className="label">
                                                {headData[item.name]}
                                            </div>
                                        )}

                                        <div className="value">
                                            {typeof item.value == 'function' ? item.value() : item.value}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    )
}


Component.displayName = 'TableListBreakpoint'


export default Component
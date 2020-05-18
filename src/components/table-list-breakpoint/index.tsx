import React, { useState, useEffect, useCallback } from "react"

export type Thead = {
    [key: string]: string | number;
}

export interface Props {
    thead?: Thead;

    data?: object[] | (() => object[]);

    caption?: string | number | (() => any);
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

    const cellData = typeof data == 'function' ? data() : data

    const [ listView, setListView ] = useState(false)

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
        for(const name in thead) {
            theadData.push({
                name: name,
                value: thead[name]
            })
        }
    }

    return (
        <>
            {!listView &&
                <table
                    className={`table-list-breakpoint table-view ${className}`}
                >
                    {caption &&
                        <caption>
                            {typeof caption == 'function' ? caption() : caption}
                        </caption>
                    }

                    {thead &&
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
                    {caption &&
                        <h2 className="list-title">
                            {typeof caption == 'function' ? caption() : caption}
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
                                        {(thead && thead[item.name]) && (
                                            <div className="label">
                                                {thead[item.name]}
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
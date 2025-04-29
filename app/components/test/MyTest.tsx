"use client";
import { STATUS_COLOR, StatusColor } from '@/lib/features/client/clientApiSlice';
import { ChangeEvent, useRef, useState } from 'react';

const MyTest = () => {
    const [val, setVal] = useState<StatusColor>({ id: 3, name: "Doctor", color: "green" });
    const selRef = useRef();
    return (
        <div>
            <select name="" id="" ref={selRef}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    console.clear();
                    console.log(JSON.stringify(e.target.value));
                    let sa: StatusColor = STATUS_COLOR.find(s => s.id === +e.target.value) as StatusColor;
                    setVal(sa)
                }}
                defaultValue={val.id}
            >
                <option value="">AAAAAAA</option>
                {STATUS_COLOR.map(status => (<option
                    key={status.id}
                    style={{ background: status.color }}
                    value={status.id}
                // onClick={() => { setVal(status) }}
                >{status.name}</option>))}
            </select>
            <button
                onClick={() => {
                    setVal({ id: 5, name: "Builder", color: "saddlebrown" })
                    selRef.current.value = 5;
                }}
            >test</button>
            <button
                onClick={() => {
                    alert(selRef.current.value)
                }}
            >test2</button>
            <h2>{val.id} - {val.name} - {val.color} </h2>
        </div>
    )
}

export default MyTest
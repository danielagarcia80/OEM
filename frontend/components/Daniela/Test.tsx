import { Button, Input, Space } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

export interface values {
    value: string;
}


export default function Page() {

    const [value, setValue] = useState("");
    const [list, setList] = useState<values[]>([]);

    useEffect(()=> {
        fetchValues();
    },[]);

    const fetchValues = async () => {
        try {
            const response = await axios.get("http://localhost:4000/daniela");
            console.log(response);
            setList(response.data);
        } catch (error) {
            console.error(error);
        }
    }



    const createDaniela = async () => {

        if (!value) {
            return;
        }
        try {
            const response = await axios.post("http://localhost:4000/daniela", { value });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div style={{ width: 400, margin: "auto" }}>
            <p>Test</p>


            <Input.Wrapper label="Value">
                <Input value={value} onChange={(e) => { setValue(e.target.value) }} placeholder="Enter value" />
            </Input.Wrapper>

            <Space h="md" />

            <Button onClick={() => {createDaniela()}}   size="md">Submit</Button>

            <Space h="md" />
            {list &&
            (<>
                {list.map((value, index) => (
                    <div key={index}>
                        <p>{value.value}</p>
                    </div>
                ))}
            </>)}

       

        </div>
    );
}
function UseEffect02() {
    
    let v = undefined; 
    
    const useState = (initValue) => {
        v = initValue;
        const setter = (value) => {
            v = value;    
        }    
        return[v, setter];
    }

    const Component = () => {
        const [num, setNum] = useState(0);
        console.log(num);

        const onClick = () => {
            setNum(num + 1);
            console.log(num);
        }
        
        return <div>{num}</div>
    }
    Component();
}

export default UseEffect02;
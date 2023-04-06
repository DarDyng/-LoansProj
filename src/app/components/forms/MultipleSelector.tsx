import "./MultipleSelector.css";

const MultipleSelector = (props: multipeSelectorProps) => {
    const select = (item: multipleSelctorModel) => {
        const selected = [...props.selected, item];
        const nonSelected = props.nonSelected.filter(value => value !== item);
        props.onChange(selected, nonSelected);
    };

    const deSelect = (item: multipleSelctorModel) => {
        const nonSelected = [...props.nonSelected, item];
        const selected = props.selected.filter(value => value !== item);
        props.onChange(selected, nonSelected);
    };

    const selectAll = () => {
        const selected = [...props.selected, ...props.nonSelected];
        const nonSelected: multipleSelctorModel[] = [];
        
        props.onChange(selected, nonSelected);
    };
    
    const deSelectAll = () => {
        const nonSelected = [...props.nonSelected, ...props.selected];
        const selected: multipleSelctorModel[] = [];

        props.onChange(selected, nonSelected);
    };


    return <>
        <div className="mb-3">
            <label>{props.displayName}</label>
            <div className="multiple-selector">
                <ul>
                    {props.selected.map(item => {
                        return <li key={item.key} onClick={() => { deSelect(item) }}>{item.value}</li>
                    })}
                </ul>
                <div className="multiple-selector-buttons">
                    <button type="button" onClick = {() => { deSelectAll() }}>{">>"}</button>
                    <button type="button" onClick={() => { selectAll() }}>{"<<"}</button>
                </div>
                <ul>
                    {props.nonSelected.map(item => {
                        return <li key={item.key} onClick={() => { select(item) }}>{item.value}</li>
                    })}
                </ul>
            </div>
        </div>
    </>
};

export default MultipleSelector;

interface multipeSelectorProps {
    displayName: string;
    selected: multipleSelctorModel[];
    nonSelected: multipleSelctorModel[];

    onChange(selected: multipleSelctorModel[], nonSelected: multipleSelctorModel[]): void;
};

export interface multipleSelctorModel {
    key: number;
    value: string;
}
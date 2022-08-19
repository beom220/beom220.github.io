import style from '@/assets/style/components/index.module.css';
import {FC, ReactNode, MouseEvent, useState, useEffect} from "react";
import {COLORS, SIZES} from "@/types/compoents";
import ButtonContent from "semantic-ui-react/dist/commonjs/elements/Button/ButtonContent";

interface ButtonProps extends StrictButtonProps {
    [key: string]: any;
}

interface StrictButtonProps {
    /** A button can show it is currently the active user selection. */
    active?: boolean

    /** A button can animate to show hidden content. */
    animated?: boolean | 'fade' | 'vertical'

    /** A button can be attached to other content. */
    attached?: boolean | 'left' | 'right' | 'top' | 'bottom'

    /** A basic button is less pronounced. */
    basic?: boolean

    /** Primary content. */
    children?: ReactNode

    /** A button can be circular. */
    circular?: boolean

    /** Additional classes. */
    className?: string

    /** A button can have different colors. */
    color?: COLORS

    /** A button can reduce its padding to fit into tighter spaces. */
    compact?: boolean

    /** A button can show it is currently unable to be interacted with. */
    disabled?: boolean


    /** A button can take the width of its container. */
    fluid?: boolean

    /** A button can be formatted to appear on dark backgrounds. */
    inverted?: boolean


    /** A labeled button can format a Label or Icon to appear on the left or right. */
    labelPosition?: 'right' | 'left'

    /** A button can show a loading indicator. */
    loading?: boolean

    onClick?: (event: MouseEvent<HTMLButtonElement>, data: ButtonProps) => void


    /** A button can have different sizes. */
    size?: SIZES

    /** The type of the HTML element. */
    type?: 'submit' | 'reset' | 'button'
}


export default function ButtonZ({active, fluid, color, size, loading, disabled, type, children}: ButtonProps) {
    const [Cn, setCn] = useState<string[]>([style.button]);
    useEffect(() => {
        if (loading) setCn([...Cn, style.loading])
        if (active) setCn([...Cn, style.active])
        if (fluid) setCn([...Cn, style.fluid])
        if (color) setCn([...Cn, style.color])
    }, [active,fluid,loading])
    return (
        <button
            type={type ?? "button"}
            disabled={disabled ?? false}
            className={Cn.join(' ')}>
            {children}
        </button>
    )
}
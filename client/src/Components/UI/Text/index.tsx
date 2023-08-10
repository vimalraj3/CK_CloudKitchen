import React from 'react';

const sizeMap = {
    'sm': '0.8rem',
    'md': '1.5rem',
    'lg': '2.4rem',
}


interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    message: string;
    /**
     * size of the text
     * @type {("sm" | "md" | "lg")}
     * @memberof TextProps
     */
    size?: "sm" | "md" | "lg";
    weight?: "light" | "normal" | "bold";
    /**
     * use HEX color code
     * @type {string}
     * @memberof TextProps
     */
    color?: string;

    /**
     *  margin 
     * @type {number}
     * @memberof TextProps
     */
    m?: number;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
    mx?: number;
    my?: number;
    p?: number;
    pt?: number;
    pb?: number;
    pl?: number;
    pr?: number;
    px?: number;
    py?: number;
}

export const Text: React.FC<TextProps> = ({ message, size, weight, color, ...props }) => {
    const defaultProps = {
        size: size || 'md',
        weight: weight || '',
        color: color || '#000'
    }

    return (
        <p className={`font-montserrat`} {...props}
            style={{
                fontSize: sizeMap[defaultProps.size],
                fontWeight: weight,
                color: color
            }}
        >{message}</p>
    );
};


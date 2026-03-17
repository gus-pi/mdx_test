type CrossIconProps = {
    size?: number;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
};

export default function Crosshair({
    size = 60,
    stroke = 'white',
    strokeWidth = 2,
    className,
}: CrossIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 60"
            width={size}
            height={size}
            className={className}
        >
            <line x1="6" y1="30" x2="25" y2="30" stroke={stroke} strokeWidth={strokeWidth} />

            <line x1="35" y1="30" x2="54" y2="30" stroke={stroke} strokeWidth={strokeWidth} />

            <line x1="30" y1="6" x2="30" y2="25" stroke={stroke} strokeWidth={strokeWidth} />

            <line x1="30" y1="35" x2="30" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
    );
}

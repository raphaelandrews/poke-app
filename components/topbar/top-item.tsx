'use client';

interface TopItemProps {
    link: string;
    label: string | undefined;
    isActive?: boolean;
}

const TopItem: React.FC<TopItemProps> = ({
    link,
    label,
    isActive
}) => {
    return (
        <a href={link}
            className={`
                text-sm
                font-semibold
                hover:text-primary
                hover:dark:text-primaryDark
                mr-2
                transition
                hover: cursor-pointer
                ${isActive ? 'text-primary dark:text-primaryDark' : 'text-alternative dark:text-alternativeDark'}
            `}
        >
            {label}
        </a>
    );
}

export default TopItem;
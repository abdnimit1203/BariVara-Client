

// eslint-disable-next-line react/prop-types
const CompoWrapper = ({children}) => {
    return (
        <div className="mx-4 max-w-[600px]">
            {children}
        </div>
    );
};

export default CompoWrapper;
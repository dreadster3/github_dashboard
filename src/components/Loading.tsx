import ReactLoading from 'react-loading';

function Loading() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <ReactLoading
                type="spin"
                color="#60A5FA"
                height={100}
                width={100}
            />
        </div>
    );
}

export default Loading;

import MyTest from "../components/test/MyTest"

const page = () => {
    return (
        <>
            <MyTest />
            <h2>var env ={process.env.NEXT_PUBLIC_BACKEND} </h2>
        </>
    )
}

export default page
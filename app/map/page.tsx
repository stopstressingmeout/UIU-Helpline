import dynamic from "next/dynamic";

const MapPage = () => {
    const MyMap = dynamic(() => import("../../components/Map"), { ssr:false })
    return (
        <div className="container flex flex-col h-screen my-5">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">Map</h2>

            <MyMap/>
        </div>
    );
};

export default MapPage;




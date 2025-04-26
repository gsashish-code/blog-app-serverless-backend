import { Outlet } from "react-router";
function Public() {
    return (
        <div className="flex max-w-full min-h-screen">
            <div className="w-3/4 min-w-2xl">
                <Outlet />
            </div>
            <div className="hidden lg:flex items-center justify-center bg-neutral-100 max-h-screen w-full">
                <div className="w-3/4 flex flex-col gap-4">
                    <div className="text-3xl font-bold">
                        "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                    </div>
                    <div>
                        <div className="text-xl font-bold">Julis Winfield</div>
                        <span className="font-normal text-neutral-500">CEO, Acme Inc</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Public
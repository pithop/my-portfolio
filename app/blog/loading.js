export default function Loading() {
    return (
        <div className="container-padding py-32">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-12 animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-glass rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-64 flex flex-col justify-between">
                        <div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-6 animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

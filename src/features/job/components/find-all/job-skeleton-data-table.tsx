export const JobSkeletonDataTable = ()=> {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 lg:p-8">
      <div className="w-full">
        {/* Header avec search et boutons */}
        <div className="md:flex lg:flex flex items-center justify-between gap-2 py-4">
          <div className="h-8 md:h-12 lg:h-12 bg-gray-200 rounded-lg md:rounded-2xl animate-pulse max-w-sm flex-1"></div>
          <div className="flex gap-2 justify-center items-center">
            <div className="h-9 w-20 bg-blue-200 rounded-md animate-pulse"></div>
            <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Table container */}
        <div className="overflow-hidden rounded-md border">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              {/* Header */}
              <thead className="bg-gray-50">
                <tr className="border-b">
                  {/* 6 colonnes headers */}
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="h-10 px-4 text-left">
                      <div className="flex items-center gap-2">
                        <div className={`h-4 bg-gray-300 rounded animate-pulse ${
                          ['w-12', 'w-20', 'w-16', 'w-24', 'w-20', 'w-16'][i]
                        }`}></div>
                        <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body avec 10 rows */}
              <tbody>
                {[...Array(10)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {/* Titre */}
                    <td className="px-6 py-4">
                      <div className={`h-4 bg-gray-200 rounded animate-pulse ${
                        [`w-48`, `w-56`, `w-44`, `w-52`, `w-40`, `w-50`, `w-46`, `w-42`, `w-48`, `w-44`][rowIndex]
                      }`}></div>
                    </td>
                    
                    {/* Entreprise */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className={`h-4 bg-gray-200 rounded animate-pulse ${
                          [`w-20`, `w-24`, `w-16`, `w-22`, `w-28`, `w-18`, `w-26`, `w-20`, `w-24`, `w-16`][rowIndex]
                        }`}></div>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      <div className={`h-6 bg-amber-100 rounded-full animate-pulse ${
                        [`w-24`, `w-20`, `w-28`, `w-32`, `w-24`, `w-28`, `w-20`, `w-32`, `w-26`, `w-24`][rowIndex]
                      }`}></div>
                    </td>

                    {/* Postulé via */}
                    <td className="px-6 py-4">
                      <div className={`h-4 bg-gray-200 rounded animate-pulse ${
                        [`w-16`, `w-20`, `w-18`, `w-16`, `w-20`, `w-24`, `w-16`, `w-18`, `w-22`, `w-20`][rowIndex]
                      }`}></div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      {rowIndex % 3 === 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className={`h-4 bg-gray-200 rounded animate-pulse ${
                            [`w-28`, `w-24`, `w-26`][rowIndex % 3]
                          }`}></div>
                        </div>
                      ) : (
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
          <div className="space-x-2 flex">
            <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-9 w-16 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
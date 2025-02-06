export const dummyData = {
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
      "financial": {
          "totalPaid": 8000,
          "totalRevenue": 10000,
          "totalDue": 2000,
          "totalTax": 0,
          "revenueTrend": [
              {
                  "_id": "2024-02-02",
                  "dailyRevenue": 1000
              },
              {
                  "_id": "2024-12-23",
                  "dailyRevenue": 200
              },
              {
                  "_id": "2024-12-26",
                  "dailyRevenue": 120
              },
              {
                  "_id": "2025-01-02",
                  "dailyRevenue": 1300
              },
              {
                  "_id": "2025-01-22",
                  "dailyRevenue": 4000
              }
          ]
      },
      "sales": {
          "totalServiceOrders": 12,
          "serviceOrdersTrend": [
              {
                  "_id": "2024-12-23",
                  "dailyCount": 2
              },
              {
                  "_id": "2024-12-26",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-01-02",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-01-22",
                  "dailyCount": 4
              },
              {
                  "_id": "2025-01-23",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-01-29",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-02-02",
                  "dailyCount": 2
              }
          ],
          "totalPosOrders": 39,
          "posOrdersTrend": [
              {
                  "_id": "2024-12-17",
                  "dailyCount": 3
              },
              {
                  "_id": "2025-01-05",
                  "dailyCount": 3
              },
              {
                  "_id": "2025-01-06",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-01-10",
                  "dailyCount": 2
              },
              {
                  "_id": "2025-01-23",
                  "dailyCount": 19
              },
              {
                  "_id": "2025-01-26",
                  "dailyCount": 7
              },
              {
                  "_id": "2025-01-28",
                  "dailyCount": 2
              },
              {
                  "_id": "2025-02-01",
                  "dailyCount": 2
              }
          ],
          "pendingServiceOrders": 12,
          "completedServiceOrders": 0,
          "popularServices": [
              {
                  "_id": "675bd976f9627aca79d59ac2",
                  "count": 3
              },
              {
                  "_id": "675bd6e4cd1793599c3fc9e3",
                  "count": 3
              },
              {
                  "_id": "679de127174441ece3b148fc",
                  "count": 2
              },
              {
                  "_id": "675e6727651be025f5fdb274",
                  "count": 2
              },
              {
                  "_id": "675bd624cd1793599c3fc9bd",
                  "count": 1
              }
          ]
      },
      "customers": {
          "totalCustomers": 3,
          "customerTrend": [
              {
                  "_id": "2025-01-22",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-02-01",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-02-02",
                  "dailyCount": 1
              }
          ]
      },
      "employees": {
          "totalEmployees": 2,
          "employeeTrend": [
              {
                  "_id": "2025-01-26",
                  "dailyCount": 1
              },
              {
                  "_id": "2025-02-03",
                  "dailyCount": 1
              }
          ]
      },
      "products": {
          "totalProducts": 5,
          "lowStockProducts": [],
          "bestProducts": [
              {
                  "productId": "67497db3eb2ec2d8f74c96b5",
                  "totalSold": 32
              },
              {
                  "productId": "673ef68ce5bdecbbc7d3d890",
                  "totalSold": 25
              },
              {
                  "productId": "673ef6cde5bdecbbc7d3d89a",
                  "totalSold": 12
              },
              {
                  "productId": "673ef6a7e5bdecbbc7d3d896",
                  "totalSold": 11
              },
              {
                  "productId": null,
                  "totalSold": 6
              }
          ]
      },
      "parts": {
          "totalParts": 8,
          "lowStockParts": [
              {
                  "_id": "6763debaed2dc0497ff01935",
                  "name": "Part Test....",
                  "stock": 0
              },
              {
                  "_id": "677f88b5449ed7e043067459",
                  "name": "Image test",
                  "stock": 2
              }
          ],
          "bestParts": [
              {
                  "partId": "675bda30cd1793599c3fca61",
                  "totalUsed": 25
              },
              {
                  "partId": "6763debaed2dc0497ff01935",
                  "totalUsed": 5
              },
              {
                  "partId": "677f88b5449ed7e043067459",
                  "totalUsed": 3
              },
              {
                  "partId": "67597470e2b687eed891b95a",
                  "totalUsed": 2
              },
              {
                  "partId": null,
                  "totalUsed": 2
              }
          ]
      }
  }
}
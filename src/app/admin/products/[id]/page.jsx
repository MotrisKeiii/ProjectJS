export default function Page({ params }) {
    const products = [
        {
            id: 1,
            name: "Màn hình TV",
            description: "Sắc nét tới từng chi tiết",
            price: "25.000.000đ",
        },
    ];

    const product = products.find(
        (item) => item.id === Number(params.id)
    );
    if (!product) {
        return <h1>Không tìm thấy sản phẩm</h1>;
    }
    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Giá: {product.price}</p>
        </div>
    );
}


// "use client"
// import { useParams } from 'next/navigation'
// import React from 'react'

// export default function page() {
//     let params = useParams()
//   return (
//     <div>
//       xem chi tiet {params.id}
//     </div>
//   )
// }


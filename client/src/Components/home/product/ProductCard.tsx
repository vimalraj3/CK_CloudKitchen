import { Grid } from '@mui/material';
import productImg from '../../../assets/home/product.jpg'
import StarIcon from '@mui/icons-material/Star';

interface IProductCardDetail {
  title: string;
  rating: number;
  price: number;
  subTitle: string;
}

interface IProductCard {
  products: IProductCardDetail[]
}

const ProductCard: React.FC<IProductCard> = ({ products }: IProductCard) => {
  return (
    <div className="w-[100%] max-w-[1200px] mx-auto mt-5">
      <Grid container spacing={2}>
        {
          products.map(({ title, subTitle, rating, price }, index) => {
            return <Grid item xs={12} sm={6} md={4} key={index}>
              <div className="px-4 py-3 aspect-[4/3] w-[100%] rounded-lg hover:shadow-xl ease-in-out transition-shadow cursor-pointer">
                <div className="w-[100%] relative ">
                  <img src={productImg} width={'100%'} height={'100%'} alt={title} className='rounded-lg' />
                </div>
                <div className="">
                  <div className="flex justify-between items-center">
                    <h4 className='font-cardo text-[18px] font-[700]'>{title}</h4>
                    <div className="flex bg-green-500  w-[50px] justify-around rounded-sm items-center">
                      <p className="font-cardo font-[700] text-[14px] text-[#fff] text-center">{`${rating}`}</p>
                      <StarIcon fontSize='small' sx={{
                        color: '#fff'
                      }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className='font-montserrat text-[12px] font-[500] text-[#9c9c9c]'>{subTitle}</p>
                    <p className='font-montserrat text-[12px] font-[500] text-[#9c9c9c]'>{`₹ ${price} for one`}</p>
                  </div>
                </div>
              </div>
            </Grid>
          })
        }
      </Grid>
    </div>
  )
}

export default ProductCard
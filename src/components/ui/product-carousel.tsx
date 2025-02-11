import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

interface Product {
  name: string;
  images: string[];
}

const ProductCarousel = ({ product }: { product: Product }) => {
  return (
    <Carousel className='w-full'>
      <CarouselContent >
        {product?.images?.map((image, index) => (
          <CarouselItem
            key={index}
            className=' bg-gray-200 p-6 rounded-lg' 
          >
            <div className=' w-full flex flex-col items-center justify-center'> 
              <img
                src={image}
                width={300} height={200}
                alt={`${product.name} Slide ${index + 1}`}
                className='object-cover rounded-lg '
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarousel;

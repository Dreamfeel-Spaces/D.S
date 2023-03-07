export const source = `
<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div data-type="space-commerce-list" class="flex gap-3 flex-wrap -m-4">
			 <div data-type="space-commerce-item" data-collection="" class="lg:w-1/4 md:w-1/2 p-4 w-full">
				<a class="block relative h-48 rounded overflow-hidden"
					><img
						alt="ecommerce"
						class="object-cover object-center w-full h-full block"
						src={{image}}
				/></a>
				<div class="mt-4">
					<h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{{category}}</h3>
					<h2 class="text-gray-900 title-font text-lg font-medium">{{title}}</h2>
					<p data-type="space-commerce-price" class="mt-1">{{price}}</p>
				</div>
			</div> 
		</div>
	</div>
</section>
`;

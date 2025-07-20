<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use Inertia\Inertia;
use App\Http\Resources\ProductResource;
use App\Http\Requests\ProductRequest;


class ProductController extends Controller
{
   

    public function __construct(protected ProductService $productService){}
  

    /**
     * Display the product list.
     *
     * @return \Inertia\Response The rendered view for the product list page.
     */
    public function index(){
    $search = request('search');
    $products = $this->productService->listProducts($search);
  
      return Inertia::render('Products/Index', [
        'products' => $products 
      ]);
    }
    /**
     * Display the create product form page.
     *
     * @return \Inertia\Response The rendered view for the create product page.
     */
    public function create(){
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created product.
     *
     * @param \App\Http\Requests\ProductRequest $request The validated request containing product data.
     * @return \Illuminate\Http\RedirectResponse Redirects back with a success message.
     */
    public function store(ProductRequest $request){
        $this->productService->createProduct($request->validated());
        return redirect()->route('products.index');
    }
}

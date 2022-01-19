<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Labtop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponseTrait;



class LabtopController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $labtops=Labtop::all();
        return $this->apiResponse($labtops);
    }

    public function show($id){
        $labtop = Labtop::find($id);

        if($labtop){
            return $this->apiResponse($labtop);
        }

        return $this->NotFoundError();
    }

    public function store(Request $request){

        $validate = Validator::make($request->all(),[
            'title' => 'required|min:2|unique:labtops,title',
            'description' => 'required|min:10,description',
            'price' => 'required|min:2,price',
        ]);

        if($validate->fails()){
            return  $this->apiResponse(null,$validate->errors(),422);
        }
        $labtop=Labtop::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        if($labtop){
            return $this->apiResponse($labtop);
        }
        return  $this->UnknownError();
    }

    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(),[
            'title' => 'required|min:2|unique:labtops,title',
            'description' => 'required|min:10,description',
            'price' => 'required|min:2,price',
        ]);

        if($validate->fails()){
            return  $this->apiResponse(null,$validate->errors(),422);
        }

        $labtop = Labtop::find($id);

        if(!$labtop){
            return $this->NotFoundError();
        }

        $labtop->update($request->all());
        if($labtop){
            return $this->apiResponse($labtop,'',201);
        }

        return  $this->UnknownError();
    }

    public function destroy($id)
    {
        $labtop = Labtop::find($id);

        if($labtop){
            $labtop->delete();
            return $this->apiResponse(true,'',200);
        }

        return $this->NotFoundError();
    }

    public function sell($id , Request $request){
        $labtop = Labtop::find($id);
        if(!$labtop){
            return $this->NotFoundError();
        };

        if($request->amount > $labtop->amount){
            return $this->apiResponse(null , 'this amount not avaliable now!!');
        };

        $labtop->amount -= $request->amount;
        $labtop->save();
    }

}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mobile;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class MobileController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $mobiles=Mobile::all();
        return $this->apiResponse($mobiles);
    }

    public function show($id){
        $mobile = Mobile::find($id);

        if($mobile){
            return $this->apiResponse($mobile);
        }

        return $this->NotFoundError();
    }

    public function store(Request $request){

        $validate = Validator::make($request->all(),[
            'title' => 'required|min:2|unique:mobiles,title',
            'description' => 'required|min:10,description',
            'price' => 'required|min:2,price',
        ]);

        if($validate->fails()){
            return  $this->apiResponse(null,$validate->errors(),422);
        }
        $mobile=Mobile::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        if($mobile){
            return $this->apiResponse($mobile);
        }
        return  $this->UnknownError();
    }

    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(),[
            'title' => 'required|min:2|unique:mobiles,title',
            'description' => 'required|min:10,description',
            'price' => 'required|min:2,price',
        ]);

        if($validate->fails()){
            return  $this->apiResponse(null,$validate->errors(),422);
        }

        $mobile = Mobile::find($id);

        if(!$mobile){
            return $this->NotFoundError();
        }

        $mobile->update($request->all());
        if($mobile){
            return $this->apiResponse($mobile,'',201);
        }

        return  $this->UnknownError();
    }

    public function destroy($id)
    {
        $mobile = Mobile::find($id);

        if($mobile){
            $mobile->delete();
            return $this->apiResponse(true,'',200);
        }

        return $this->NotFoundError();
    }
}

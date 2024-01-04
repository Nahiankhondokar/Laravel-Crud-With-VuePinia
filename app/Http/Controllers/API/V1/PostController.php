<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderByDesc('id')->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        if($request->input('title') != null && $request->input('description') != null){
            Post::create([
                'title'       => $request->input('title'),
                'description' => $request->input('description'),
            ]);

            return response()->json('Post created');
        }else {
            return response()->json('All feilds are required !');
        }
    }

    public function edit()
    {

    }

    public function update()
    {

    }
}
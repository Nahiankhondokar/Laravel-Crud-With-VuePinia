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

            $imageName = '';
            if($request->hasFile('image')){
                $image = $request->file('image');
                $imageName = time().rand().'.'.$image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
            }

            Post::create([
                'title'       => $request->input('title'),
                'description' => $request->input('description'),
                'image'       => $imageName
            ]);

            return response()->json('Post created');
        }else {
            return response()->json('All feilds are required !');
        }
    }

    public function update(Request $request, Post $post)
    {
        $imageName = '';
        if($request->hasFile('image')){
            if(file_exists(public_path('images/').$post->image)){
                @unlink(public_path('images/').$post->image);
            }
            $image = $request->file('image');
            $imageName = time().rand().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        }else {
            $imageName = $post->image;
        }

        $post->title = $request->input('title');
        $post->description = $request->input('description');
        $post->image = $imageName;
        $post->update();

        return response()->json('post updated');
    }

    public function destroy(Request $request, Post $post)
    {
        $post->delete();
        return response()->json('post delete');
    }
}

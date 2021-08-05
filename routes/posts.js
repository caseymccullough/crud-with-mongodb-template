const express = require('express');
const router = express.Router(); 
const Post = require('../models/Post');

// GET ALL POSTS
router.get('/', async (req, res) => {
   try{
         const posts = await Post.find(); // here we could return a given # or engage in many options with a .method() after find
         res.json(posts);
         console.log ("inside of try block in get()")
   }catch(err) {
      res.json({ disaster: err});
   }
});

// SUBMIT A POST
router.post('/', async (req, res) => {
   try {     
      const post = await new Post ({
         title: req.body.title,
         description: req.body.description
      });
      const createdPost = await Post.create(post);

      res.status(200).json(createdPost); 
   }catch(err){
      res.status(400).json({
         msg: err.message
      })
   }
});

// GET A SPECIFIC POST
router.get('/:postId', async (req, res) => {
   try{
      const post = await Post.findById(req.params.postId);
      res.json(post);
   } catch (err) {
      res.json( {message: err});
   }
});

router.delete('/:postId', async (req, res) => {
   try{
      const removedPost = await Post.findByIdAndDelete(req.params.postId);
      console.log ("removing: " + removedPost);
      res.json(removedPost);
   }catch (err) {
      res.json({ message: err});
   }
})

// UPDATE A POST--only title changes(?)
router.patch('/:postId', async (req, res) => {
   try{
      const updatedPost = await Post.updateOne(
         {_id: req.params.postId},
         { $set: { title: req.body.title }}
      );
      res.json(updatedPost);
   }catch (err){
      res.json({message: err});
   }
});

module.exports = router; 

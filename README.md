# Highlight_Object_ThreeJS
Project made for tutorial on how to outline an object when the cursor hovers over it. Uses ThreeJS.

STEPS TO Highlight objects In ThreeJS:

1. Setup an EffectComposer
  - This is required for additional (post) processing effects to be applied after the initial render.
2. Setup the RenderPass, and add it to the EffectComposer
  - This tells the effect composer the first step is to render the 3D scene normally.
3. Set up the OutlinePass, and add it to the EffectComposer
  - OutlineHelper.js is worth importing. it has many helpful methods for this.
  - getOutlineEffect() creates a basic OutlinePass object.
  - The OutlinePass can perform calculations for how an outline should look and behave around an object.
  - After the RenderPass occurs, the EffectComposer will perform the OutlinePass
4. Configure the OutlinePass to your desired settings
  - configureOutlineEffectSettings_Default() can be modified for your use case.
  - You may change things like how big the line is, it's color, and how fast it pulses.
5. To outline an object, add it to the list of 'selectedObjects' for the outlinePass
  - The outline will appear around each of the selected objects.
6. Run the render function on the composer
  - This will kick off each pass in the composer in the order they were supplied.
  - This will first be the basic render pass
  - Then the outline will occur. 

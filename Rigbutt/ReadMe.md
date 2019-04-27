# Rigbutt

## What is Rigbutt?

Rigbutt is a fully [Duik Bassel](https://rainboxprod.coop/en/tools/duik/) rigged character based on Dickbutt created by [K.C. Green](https://kcgreendotcom.com) in 2006. I happen to love the Dickbutt character and have been working on a fully rigged version for my fellow GIF makers to use for a long time. This is the result of that work and the making of this video: https://streamable.com/7ee8k

## Requirements

To use this, you will need:

* After Effects 2018 or greater (v 15.x)
* [Duik Bassel](https://rainboxprod.coop/en/tools/duik/)
* Patience
* A sense of humor

If you're missing any of those turn back now until you have them. There's nothing tangible for you to use here otherwise.

## Using Rigbutt

If you open the `Rigbutt.aep` project file, you'll see some stuff in there. **But,** you're not supposed to open that. Instead **import** it into your project.

Drag the comp `bound-Rigbutt` onto [the comp you want him in(567k GIF)](documentationImages/rigbutt-import.gif). Then go to the Duik panel and select "Extract controllers" After that, the [controllers will show up for you to manipulate (1M GIF)](documentationImages/rigbutt-dragToComp.gif).

Once in your comp and set up, you can scale the `bound-Rigbutt` as you need. The controllers will stay in place thanks to Duik. **Note that Rigbutt does not have any keyframes set.** To animate him, you'll need to create keyframes for translation and rotation (and maybe some other stuff for the eye and mouth controllers - experiment!). After that, [you can animate the controllers freely (1.4M GIF)](documentationImages/rigbutt-keyIng.gif).

Finally, when you're done animating use the comp `colorControl-Rigbutt` to set the opacity of the controllers to 0 (layer `Control Opacity`). You can also control the other color aspects of Rigbutt using that comp. Want red outlines instead of black? Change the stroke on the `Rigbutt-Color` layer. Want a blue Rigbutt? Change the `Color Overlay` on that same layer.

![Rigbutt Color Comp](documentationImages/usage-ColorComp.jpg?raw=true "Rigbutt Color Comp")

## You're on your own!

I offer no support for this and certainly do not deserve all of the credit for it. You're on your own for learning more about Duik and creating animations with Rigbutt. If you make improvements you think should be shared, please feel free to create a pull request with your changes.

Use it in good health!

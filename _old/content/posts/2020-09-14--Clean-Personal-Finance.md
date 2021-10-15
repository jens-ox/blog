---
title: gaining control over personal finances
date: '2020-09-14T12:00:37.121Z'
template: 'post'
draft: false
slug: 'personal-finances'
category: 'Project Ideas'
tags:
  - 'open source'
  - 'project idea'
description: 'The fact that absolutely nothing is taught in school regarding personal finances always bugged me, as I consider having control over and a long-term strategy for your own money to be one of the really important things when starting to work in your first full-time position. This post outlines my pain points with existing personal finance budgeting tools and proposes a more flow-based approach to it.'
socialImage: '/media/image-money.jpg'
---

> Note: The first version of the budgeting tool developed after writing this has been published [on GitHub](https://github.com/jens-ox/budgeting). If you want to use it yourself, you can do so [here](https://simple-budget.netlify.app/).

The fact that absolutely nothing is taught in school regarding personal finances always bugged me, as I consider having control over and a long-term strategy for your own money to be one of the really important things when starting to work in your first full-time position. This post outlines my pain points with existing personal finance budgeting tools ("trackers") and proposes a more flow-based approach to it.

![Finance Banner](/media/image-money.jpg)

# What's wrong with existing trackers?

There's a ton of finance tracking tools out there, but so far I could not find one which doesn't have _at least_ one of the following problems:

## ugly and unnecessary complex to use

Tracking your personal finances is only useful when you do it consistently. You'll most certainly be able to cover all use-cases that you can think of using one of the dinosaurs like [GNU Cash](https://www.gnucash.org/). But going to your PC to enter that 49 cents you spent at the bakery is most likely not happening.

## not cross-platform

Most personal finance tools run either on your phone or your PC. I want to be both able to quickly log stuff on the go on my smartphone and view reports and analytics on my PC.

## expensive

A tool to track finances is and will always be a glorified excel sheet. I'm not going to pay 10€ per month for some bizarre budget tool subscription.

## hard to adapt to own needs and spending habits

This is the usual trade-off between functionality and usability. I think there's some room for improvements.

## privacy-invading

I don't want some hip start-up to have full access to my banking accounts. I just want to track stuff, no "AI-backed subscription optimization" (which is clearly just some marketing buzz bingo and not an actually useful feature).

# What it should not do

Here are some functionalities that I think can be discarded in order to simplify making such a tracker enjoyable to use while being able to cover most use-cases.

## no notion of different banking accounts

Yes, most people have multiple banking accounts. I don't think that you have to separately track them - the only real difference is that you could see your current balance in your tracker. You can see that in your bank's app anyway.

Instead, the tracker behaves in the following way:

<figure>
	<img src="/media/personal-finances/sketch.png" alt="Rough sketch" style="max-width:400px">
	<figcaption>Rough solution sketch.</figcaption>
</figure>

Each month is visualized in a graph like the one above. This graph encodes some of the metrics that I consider to be the most important ones:

- how much money comes in per month?
- how much money goes out for which category per month?
- what is my savings rate?

# Other nice features

- **web application**

  Implementation should be done as web app, so that it can be used both on a desktop PC and on the smartphone.

- **tagging**

  Each transaction can be tagged, so that transactions can be easily grouped and analyzed.

- **per-tag/-category spending per month**

  See how much you spend on what each month, in absolute and relative values. This covers the three questions from above.

- **set goals per category/tag**

  There's certain recommendations on how much you should spend on what each month (e.g. not more than 30% on housing). Those recommendations should be trackable by setting goals.

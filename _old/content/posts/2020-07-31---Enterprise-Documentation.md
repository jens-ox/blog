---
title: documenting things in a large-scale enterprise context
date: '2020-07-31T12:00:37.121Z'
template: 'post'
draft: false
slug: 'enterprise-documentation'
category: 'Project Ideas'
tags:
  - 'open source'
  - 'project idea'
description: "It's well known that good documentation is just as important as the actual code. In enterprise environments, writing good documentation is often hard - versioned docs are spread across lots of repos, centralized docs are rotting away in Confluence. In this post, I want to propose a solution for centralized documentation in multi-repo enterprise environments."
socialImage: '/media/image-notes.jpg'
---

> **Note**: This project is now a work in progress! You can find it [on my GitHub](https://github.com/jens-ox/doc-spider).

It's well known that good documentation is just as important as the actual code. In enterprise environments, writing good documentation is often hard - versioned docs are spread across lots of repos, centralized docs are rotting away in Confluence, because nobody will go out of its way to manually keep them up to date.

In this post, I want to propose a solution for centralized documentation in multi-repo enterprise environments.

![Documentation Image](/media/image-notes.jpg)

# Why Care?

<figure class="float-right" style="width: 240px">
	<img src="/media/enterprise-documentation/meme.jpg" alt="Self-documenting is a lie">
	<figcaption>Self documenting code is an illusion</figcaption>
</figure>

Why even spend any time on writing documentation? Writing code instead of writing about the code is way more productive, right?

And why bother cross-referencing some design document, noob developers just have to use the damn confluence search function...

## Onboarding

As a developer new to an existing project, onboarding becomes a dreadful experience when bad or even no documentation is present -- you have to experiment around, annoy experienced developers with questions they don't have time to answer for and even basic things like checking out the repo and getting everything up and running on your machine becomes a week-long task.

This makes the job less enjoyable, both for new and seasoned developers.

## Code Reuse

One of the big maintenance nightmares in enterprise codebases is the risk of complicated duplications. Instead of elements getting reused, parallel solutions are developed for a nearly identical problem, which makes resolving the duplication hard, as it's just a 90% duplication.

Having elements with good documentation -- both concerning their behavior and their APIs -- is the cornerstone of reusability. No other person besides yourself will bother correctly using your component if it has no well-documented API.

This results both in **bizarre duplications** and **hard-to-sundown** components.

## Solid Implementation Decisions

Documenting design choices and implementation details forces you to really re-think them. You'll often notice some cases where your code performs strangely when writing about it.

## Maintainability

> maintainability is inversely proportional to the amount of time it takes a developer to make a change and the risk that change will break something
>
> <small>[StackExchange: Characteristics of maintainable code](https://softwareengineering.stackexchange.com/a/134863)</small>

Well-documented code is way easier to maintain.

## Searching for Stuff

If you often have to search inside of actual implementation details for that one function that correctly formats a date, you probably lack proper documentation, which would've saved you time searching.

# Solution

- use [Gatsby](https://www.gatsbyjs.org/) to generate a static site from markdown files.
- general docs are stored in a main docs repo.
- everything else is stored in separate repos (when possible alongside code) and added as submodule.
- every submodule has one configuration file which tells the documentation generator stuff like
  - what's this package's name
  - short description
  - where are this package's markdown files

<figure>
	<img src="/media/enterprise-documentation/sketch.jpg" alt="Rough sketch">
	<figcaption>Rough solution sketch. <br> Main site on the left, per-module documentation on the right.</figcaption>
</figure>

## Main Site

The main site contains general documentation (including self-documentation on how to add another module to it), an overview over all modules (in the middle, searchable) and pages (in the navbar) for general information. Modules can expose pages.

Also, a global search is available in the navbar.

## Module Sites

All markdown files are available as top-level elements in the sidebar, which can be expanded (and are expanded by default when accessing a specific file). The markdown file contents are in the middle, on the right is an interactive table of contents.

This is obviously heavily inspired by the Gatsby Docs which use more or less exactly this structure (see e.g. [a random docs page](https://www.gatsbyjs.org/docs/recipes/)).

# Implementation details

Config file exported by submodules:

```json
{
  "name": "My custom code module",
  "slug": "my-module",
  "description": "This module does stuff, and exists.",
  "files": ["src/**/*md"],
  "sidebarYaml": "./.docs/sidebar.yaml",
  "pages": [
    {
      "name": "Guides",
      "file": "./.docs/guides.md"
    }
  ]
}
```

- **name**: Name of the module, visible in the overview.
- **description**: Description of the module, visible in the overview.
- **slug**: Used to generate static and well-defined urls.
- **files**: Which markdown files to be included.
- **sidebarYaml**: Optional, used to specify a certain order of the files in the sidebar (and which to put there).
- **pages**: Use with caution, adds entries to the navbar for highly-used elements (like the design document overview).

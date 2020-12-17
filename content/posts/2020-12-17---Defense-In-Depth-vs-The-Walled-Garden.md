---
title: Defense In Depth vs The Walled Garden
date: "2020-12-17T00:00:00.000Z"
template: "post"
draft: false
slug: "defense-in-depth-vs-the-walled-garden"
category: "Cybersecurity"
tags:
  - "Education"
  - "Software engineering"
  - "Best practices"
description: "One of these is the leading paradigm of secure network engineering. The other is the future. Get the full breakdown of what Defense-in-Depth is all about."
socialImage: "/media/layers.jpg"
---
 
For the past X number of years that computers have been a thing, the **walled garden** was the approach of choice for designing a secure network.

Actually, that's not quite accurate. For most of those years, *nothing* was the approach of choice because nobody cared about security. But, once they *started* caring about security, it was all about the walled garden.

In **secure systems engineering**, a walled garden is any network, application, or other computing system that has exactly one authentication barrier.

For example, your Windows computer (for the [most part](https://en.wikipedia.org/wiki/User_Account_Control), anyways) is a walled garden. That is to say, if somebody has your password, they can more-or-less do whatever they want to your computer. Getting past the initial login is the only obstacle preventing somebody with access to your computer from wreaking havoc inside the garden walls.

The real world equivilent to this would be a movie theater. Sure, you have to wait in a line and show your ticket before you can enter, but once you're in, nobody is going to check your ticket or ask you how long you've been there. Once you're in the garden, you're in until you decide to leave.

If it wasn't already obvious, in systems design, this is generally a **bad move**.

![onions have layers, networks have layers](/media/layers.jpg)
*Your security measures should be kind of like an onion. Onions have layers, networks have layers. Get it?*

The princible of **defense in depth** is simple. As opposed to focusing all your energy fortifying and strengthening one huge wall, build as many *internal* barriers against malicious tampering as possible. 

Assume your attacker will get in (its probably a safe assumption). Rather than focusing on prevention, concentrate on damage control. What additional layers of authentication can you add to prevent the attacks you're worried about?

The simpliest technical example of this would be [multi-factor authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication). A website *could* try to strengthen its walled garden by enforcing longer, more complex passwords. This isn't adding another layer of authentication, just making the one thats there stronger. 

Alternatively, a website could add 2FA via a [TOTP algorithm](https://en.wikipedia.org/wiki/Time-based_One-Time_Password) like Google Authenticator. This security measure is an example of an *additional* authentication layer because it verifies something you *have* rather than something you *know*, like your password.

Most of the time, defense in depth is used to refer to situations and systems much more complicated than this. For example, if you've ever logged into a organizational network, it used to be that if you were connected to the company VPN properly, you were fully authenticated to access every resource on the corporate network.

With a defense in depth approach, this same network might used a much more complicated authentication ticketing system like [Kerberos](https://web.mit.edu/kerberos/) to control your interactions with each and every resource on the network. If it sounds like this is much more complicated and costly, *that's because it is*, but it has been shown to greatly increase the resilience of a network to external attack, especially when those external attackers become internal ones.

Let's finish off with a real world analogy. Do you think if you hopped the teller's desk at your local bank, you would be able to walk into an unlocked backroom full of millions of dollars in cash? Thankfully for us, banks employ a defense in depth strategy to protect their assets. Between the teller's desk and the majority of the cash itself is, in all probability, more than one locked door and at least one pretty impressive safe. Even most bank employees don't have easy access to it, and at some banks, access to the safe is completely disabled during non-business hours, even to those who would normally be able to enter it.

All in all, defense in depth is not necessarily a new concept, but in the cutting-edge world of computing, its one that we should persue with renewed urgency. You never know when somebody is going to hop the teller's desk.
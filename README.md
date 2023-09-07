## Problem

The extension must be published to google extension store to be used normally, but it needs to pay 5 dollars. However, I don't have ways to pay :(. Now it can only be used through loading unpacked extension :(.

## Description

This extension is made for chrome. However, if you use the browser based on Chromium, you can also use this extension.

All in all, I made this extension for better adding training and for fun :);

## Functions

- Hide codeforces tags

    This idea is from [there](https://github.com/vishalagrawal22/tag-hider-codeforces).

    This extension's effection is almost like this. But:

    1. Problem Id with lowercase is also accepted.
    2. You don't need to modify your codeforces setting.
    3. The style is more like the original style.

    ![2023-09-06-22-38-16](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-38-16.png)

    ![2023-09-06-22-38-27](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-38-27.png)

    ![2023-09-06-22-38-52](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-38-52.png)

- Jump quickly

    You can use this extension quickly jump to the codeforces problem, luogu problem, ~~bilibili video~~, ~~pixiv artwork~~.

    1. First, `<Ctrl+L>` to focus your browser omnibox.
    2. Input `at`(short for add training), and hit `<Tab>`.

        ![2023-09-06-22-45-38](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-45-38.png)

        ![2023-09-06-22-45-58](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-45-58.png)

    3. Input the string matching the reguler expression.

        - `/^\d+[a-zA-Z]$/i` for codeforces
        - `/^p\d+$/i` for luogu
        - `/^[(av)|(bv)]\w+$/i` for bilibili
        - `/^\d{8}$/` for pixiv artwork

    4. Hit the `<Enter>`!

- See your rating in codeforces.

    1. Click your extension on your toolbar.

        ![2023-09-06-22-55-38](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-55-38.png)

    2. Click the modify button and input your codeforces Id.

        ![2023-09-06-22-56-41](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-56-41.png)

    3. Then your rating will show.(The time depends on your network)

        ![2023-09-06-22-58-50](https://cdn.jsdelivr.net/gh/llleixx/image/img/2023-09-06-22-58-50.png)

## Next step

Maybe I will add some useful functions.(if I have time :))

## About this extension

This extension is my first chrome extension(also the first front end work). Of course, there may be many bugs, I hope you can raise an issue or help me improve this extension :).

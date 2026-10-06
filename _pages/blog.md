---
title: Blog
lede: News and longer thoughts on agentic engineering with systems42.
permalink: /blog/
---

{% if site.posts.size > 0 %}
<ul class="post-list">
{% for post in site.posts %}
  <li>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    {% if post.lede %}<p>{{ post.lede }}</p>{% endif %}
  </li>
{% endfor %}
</ul>
{% else %}
No posts yet. The first ones will appear here as we publish results from our test projects.
{% endif %}

FROM ruby:3.4-slim

LABEL description="systems42.org Jekyll dev image"

RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential git libcurl4 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp/bundle

RUN gem install bundler:2.6.9

COPY Gemfile Gemfile.lock ./

RUN bundle config set path /usr/local/bundle \
    && bundle install --frozen --jobs 4 --retry 3 \
    && mkdir -p /opt/site-deps \
    && sha256sum Gemfile.lock | awk '{ print $1 }' > /opt/site-deps/.gemfile-lock.sha256

COPY docker/jekyll-entrypoint.sh /usr/local/bin/jekyll-entrypoint
RUN chmod +x /usr/local/bin/jekyll-entrypoint

WORKDIR /site

EXPOSE 4242

ENTRYPOINT ["jekyll-entrypoint"]
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4242", "--watch"]

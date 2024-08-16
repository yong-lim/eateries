module Jekyll
  class CategoryPageGenerator < Generator
    safe true
    def generate(site)
      categories = site.posts.docs.flat_map { |post| post.data['categories'] || [] }.to_set
      categories.each do |category|
        site.pages << CategoryPage.new(site, site.source, category)
      end
    end

  end

  # A Page subclass used in the `CategoryPageGenerator`
  class CategoryPage < Page
    def initialize(site, base, category)
      @site = site
      @base = base
      @dir  = File.join('category', category)
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data['category'] = category

      category_title_prefix = site.config['category_title_prefix'] || "Category: "
      self.data['title'] = "#{category_title_prefix}#{category}"
    end
  end
end

    start (tag, attrs, unary) {
      // 确定命名空间
      const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

      // 处理 IE 的 SVG bug
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs)
      }

      // 获取AST元素
      let element: ASTElement = createASTElement(tag, attrs, currentParent)
      if (ns) {
        element.ns = ns
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true
      }

      // 遍历执行 preTransforms 方法
      for (let i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element
      }

      // 处理各种方法
      if (!inVPre) {
        // v-pre
        processPre(element)
        if (element.pre) {
          inVPre = true
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true
      }
      if (inVPre) {
        // 处理原始属性
        processRawAttrs(element)
      } else if (!element.processed) {
        // v-for v-if v-once
        processFor(element)
        processIf(element)
        processOnce(element)
        // 元素填充？
        processElement(element, options)
      }

      // 检查根节点约束
      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              `Cannot use <${el.tag}> as component root element because it may ` +
              'contain multiple nodes.'
            )
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            )
          }
        }
      }

      // 语法树树管理
      if (!root) {
        // 无root
        root = element
        checkRootConstraints(root)
      } else if (!stack.length) {
        // 允许有 v-if, v-else-if 和 v-else 的根元素
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element)
          // 添加 if 条件
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          })
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            `Component template should contain exactly one root element. ` +
            `If you are using v-if on multiple elements, ` +
            `use v-else-if to chain them instead.`
          )
        }
      }
      if (currentParent && !element.forbidden) {
        // v-else-if v-else
        if (element.elseif || element.else) {
          // 处理 if 条件
          processIfConditions(element, currentParent)
        } else if (element.slotScope) { // slot-scope
          currentParent.plain = false
          const name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
        } else {
          // 将元素插入 children 数组中
          currentParent.children.push(element)
          element.parent = currentParent
        }
      }
      if (!unary) {
        currentParent = element
        stack.push(element)
      } else {
        // 关闭元素
        closeElement(element)
      }
    },
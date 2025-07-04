type RequestFunction<T> = () => Promise<T>;

class RequestQueue {
  private queue: Array<{
    request: RequestFunction<any>;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];
  private isProcessing = false;
  private timer: NodeJS.Timeout | null = null;
  private interval: number;

  constructor(intervalSeconds: number) {
    this.interval = intervalSeconds * 1000; // 转换为毫秒
  }

  /**
   * 添加请求到队列
   * @param request 返回Promise的请求函数
   * @returns 返回Promise，当请求完成时resolve
   */
  add<T>(request: RequestFunction<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.processQueue();
    });
  }

  /**
   * 处理队列中的请求
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const { request, resolve, reject } = this.queue.shift()!;

    try {
      const result = await request();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      // 设置定时器，在间隔时间后处理下一个请求
      this.timer = setTimeout(() => {
        this.isProcessing = false;
        this.processQueue();
      }, this.interval);
    }
  }

  /**
   * 清空队列并停止当前计时器
   */
  clear(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.queue = [];
    this.isProcessing = false;
  }

  /**
   * 获取当前队列长度
   */
  get length(): number {
    return this.queue.length;
  }

  /**
   * 更新请求间隔时间
   * @param intervalSeconds 新的间隔时间（秒）
   */
  updateInterval(intervalSeconds: number): void {
    this.interval = intervalSeconds * 1000;
  }
}

export default new RequestQueue(2.5);


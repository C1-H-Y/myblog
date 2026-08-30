---
title: 03.2.2 quantum well，也即在势场下的透射率
date: 2026-07-21
categories:
  - kwant
--- 


我们考虑一个量子势阱，散射区域是一个圆环，圆环内部有势场分布，外部没有势场。势场分布由 `potential` 函数给出，这里我们用一个简单的 tanh 函数来描述 p-n 结。

首先定义晶格和散射区域的形状：

```python
def make_system(r=10, w=2.0, pot=0.1):
    #### Define the scattering region. ####
    # circular scattering region
    def circle(pos):
        x, y = pos
        return x**2 + y**2 < r**2

    syst = kwant.Builder()

    # w: width of the potential maximum of the p-n junction
    def potential(site):
        (x, y) = site.pos
        d = y * np.cosd(30) + x * np.sind(30)
        return pot * np.tanh(d / w)

    syst[graphene.shape(circle, (0, 0))] = potential
```

可以看出，这实际上对任何形状都适用。我们加上了一个势场用于描述 p-n 结。

下一步是添加 hopping 项，运用 `HoppingKind`。为了描述方便我们自己定义 hopping：

```python
hoppings = (((0, 0), a, b), ((0, 1), a, b), ((-1, 1), a, b))
```

最近邻模型是包含不同格点之间的 hopping，为了这种类型的 hopping，只是指出相关的晶格指数，我们也需要指出到底是哪两个类型的原子相互作用（在这里是一 a 一 b）。当然 `HoppingKind` 在这里还是能用的：

```python
syst[[kwant.builder.HoppingKind(*hopping) for hopping in hoppings]] = -1
```

现在我们把其中一个格点删掉，再加上一个另外的关联：

```python
del syst[a(0, 0)]
syst[a(-2, 1), b(2, 2)] = -1
```

像之前一样定义端口形式：

```python
# left lead
sym0 = kwant.TranslationalSymmetry(graphene.vec((-1, 0)))

def lead0_shape(pos):
    x, y = pos
    return (-0.4 * r < y < 0.4 * r)

lead0 = kwant.Builder(sym0)
lead0[graphene.shape(lead0_shape, (0, 0))] = -pot
lead0[[kwant.builder.HoppingKind(*hopping) for hopping in hoppings]] = -1

# the second lead, going to the top right
sym1 = kwant.TranslationalSymmetry(graphene.vec((0, 1)))
def lead1_shape(pos):
    v = pos[1] * np.sind(30) - pos[0] * np.cosd(30)
    return (-0.4 * r < v < 0.4 * r)

lead1 = kwant.Builder(sym1)
lead1[graphene.shape(lead1_shape, (0, 0))] = pot
lead1[[kwant.builder.HoppingKind(*hopping) for hopping in hoppings]] = -1
```

注意这里用到了 `vec` 指令，`vec` 的用处是给出一个实空间中的对称矢量，但对于许多晶格对称性在正格矢坐标下更好表示，所以用 `graphene.vec(-1, 0)` 就表示是 $(-a_1 + 0 \cdot a_2)$ 的对称性矢量。

用于计算能量本征值的代码如下：

```python
def compute_evs(syst):
    # compute some eigenvalues of the closed system
    sparse_mat = syst.hamiltonian_submatrix(sparse=True)
    evs = sla.eigs(sparse_mat, 2)[0]
    return evs
```

接下来是计算电导率的部分：

```python
def plot_conductance(syst, energies):
    data = []
    for energy in energies:
        smatrix = kwant.smatrix(syst, energy)
        data.append(smatrix.transmission(0, 1))
    plt.figure()
    plt.plot(energies, data)
    plt.xlabel("energy [t]")
    plt.ylabel("conductance [e^2/h]")
    plt.show()
```

最后是主程序：

```python
def main():
    syst = make_system()
    kwant.plot(syst)
    # compute_evs(syst.finalized())
    plot_conductance(syst.finalized(), energies=[0.01 * i - 0.2 for i in range(100)])

if __name__ == '__main__':
    main()
```

画出来的图如下：

<div align="center">
  <img src="/images/1.2.2.png" width="500" alt="环形系统示意图"/>
</div>

*图 1.2.2　环形系统示意图*

<div align="center">
  <img src="/images/1.2.3.png" width="500" alt="环形系统电导率图像"/>
</div>

*图 1.2.3　环形系统电导率图像*

可以看出，由于 p-n 结的存在，电导率图像发生了明显的变化，特别是在零能附近，电导率被显著地抑制了。
